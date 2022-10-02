import ProfileBar from '../../../components/profile-bar';
import { AxiosResponse } from 'axios';
import { InternalUrls } from '../../../shared/datasources/api-urls';
import { IGetProfiles } from '../../../shared/constants/types/profile.type';
import { NextDnsApi } from '../../../shared/datasources/base-api';
import { NextPage } from 'next';
import {
  Badge,
  Button,
  Container,
  Dropdown,
  Grid,
  Loading,
  Spacer,
  Table,
  Tooltip
} from '@nextui-org/react';
import { useQuery } from 'react-query';
import { GetLogs } from '../../../shared/services/internal-service';
import { Status } from '../../../shared/constants/enums/status.enum';
import { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import { useProfiles } from '../../../shared/hooks/useProfile.hook';
import { Log } from '../../../shared/constants/models/logs.model';
import { useRouter } from 'next/router';

type IProps = {
  profileId: string;
};

const refetchTimes = [2000, 5000, 10000];

const Logs: NextPage<IProps> = ({ profileId }) => {
  const { activeProfile } = useProfiles();
  const router = useRouter();
  profileId = profileId ?? router.query.profileId;
  const [refectchInterval, setRefetchInterval] = useState<number>(5000);
  const {
    isLoading,
    data = [],
    isRefetching,
    refetch
  } = useQuery('Logs', async () => await GetLogs(profileId), {
    refetchInterval: refectchInterval,
    enabled: !!profileId
  });

  const shouldShowToolTip = (
    show: boolean,
    children: ReactNode,
    reasons: Log['reasons']
  ): ReactNode => {
    if (show) {
      return (
        <Tooltip
          rounded
          color="warning"
          placement="left"
          contentColor="invert"
          hidden={!!reasons.length}
          content={
            <ul>
              {reasons.map((reason) => (
                <li key={reason.id}>{reason.name}</li>
              ))}
            </ul>
          }
        >
          <Badge color={'warning'}>{children}</Badge>
        </Tooltip>
      );
    }
    return <Badge>{children}</Badge>;
  };

  useEffect(() => {}, [data.length]);
  return (
    <div>
      <Head>
        <title>Logs | {activeProfile?.name ?? 'Your Profile'} </title>
      </Head>
      <ProfileBar />
      <Container>
        <Spacer />
        <Grid.Container gap={2} justify="space-between" alignItems="center">
          <Grid>
            <Tooltip
              content="Change the frequency of log retrieval."
              placement="right"
            >
              <Dropdown>
                <Dropdown.Button ghost>
                  Refetch Logs: {refectchInterval / 1000}s
                </Dropdown.Button>
                <Dropdown.Menu
                  selectionMode="single"
                  selectedKeys={Array.from(refectchInterval.toString())}
                  disabledKeys={[refectchInterval.toString()]}
                  onSelectionChange={(key) => {
                    let value = Object.values(key)[0];

                    setRefetchInterval(Number(value));
                  }}
                >
                  {refetchTimes.map((t) => (
                    <Dropdown.Item key={t}>{t / 1000}s</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Tooltip>
          </Grid>
          <Grid>
            <Loading
              type="points"
              style={{
                transition: 'ease 0.2s',
                opacity: isLoading || isRefetching ? 1 : 0
              }}
            />
          </Grid>
          <Grid>
            <Tooltip content="Manually get all logs." placement="left">
              <Button
                disabled={isLoading || isRefetching}
                onPress={() => refetch()}
              >
                Get Logs
              </Button>
            </Tooltip>
          </Grid>
        </Grid.Container>

        <Table>
          <Table.Header>
            <Table.Column>Domain</Table.Column>
            <Table.Column>Host</Table.Column>
            <Table.Column>Device</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Accessed On</Table.Column>
            <Table.Column>Blocked Reasons</Table.Column>
          </Table.Header>
          <Table.Body
            items={data.map((log, i) => ({
              key: i,
              domain: log.domain,
              host: log.root.replace(
                /(https?|ftp):\/\/[\.[a-zA-Z0-9\/\-]+/g,
                ''
              ),
              device: log.device.name || log.device.localIp,
              status: log.status,
              accessedOn: new Date(log.timestamp),
              reasons: log.reasons
            }))}
          >
            {(item) => (
              <Table.Row key={item.key}>
                <Table.Cell>{item.domain}</Table.Cell>
                <Table.Cell>{item.host}</Table.Cell>
                <Table.Cell>{item.device}</Table.Cell>
                <Table.Cell>
                  <Badge
                    color={item.status === Status.Default ? 'success' : 'error'}
                  >
                    {item.status === Status.Default ? 'Allowed' : item.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  {item.accessedOn.toDateString()}{' '}
                  {item.accessedOn.toLocaleTimeString()}
                </Table.Cell>

                <Table.Cell>
                  {shouldShowToolTip(
                    !!item.reasons.length,
                    item.reasons.length,
                    item.reasons
                  )}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Container>
    </div>
  );
};

export default Logs;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export async function getStaticProps({
  params
}: {
  params: { profileId: string };
}) {
  return { props: { profileId: params.profileId } };
}
