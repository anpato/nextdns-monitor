import {
  Button,
  Card,
  Container,
  Grid,
  Loading,
  Spacer,
  Table,
  Text
} from '@nextui-org/react';
import { FC } from 'react';
import { AnalyticsStatus } from '../constants/models/analytics.model';

type IProps = {
  analytics: AnalyticsStatus[];
  toggleOpen: (value: boolean) => void;
  isLoading: boolean;
};

const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const AnalyticsStatus: FC<IProps> = ({ analytics, toggleOpen, isLoading }) => {
  let RenderedItems = (
    <Table.Body>
      <Table.Row>
        <Table.Cell>{null}</Table.Cell>
        <Table.Cell>
          <Loading />
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  );
  if (!isLoading) {
    RenderedItems = (
      <Table.Body items={analytics}>
        {analytics.map((entry) => (
          <Table.Row key={entry.status}>
            <Table.Cell>{capitalize(entry.status)}</Table.Cell>
            <Table.Cell>{entry.queries}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    );
  }
  return (
    <Container>
      <Spacer />
      <Grid.Container gap={2} justify="space-between">
        <Grid>
          <Text h3>Query Status</Text>
        </Grid>
        <Grid alignItems="center">
          <Button auto onPress={() => toggleOpen(true)}>
            View Rules
          </Button>
        </Grid>
      </Grid.Container>
      <Card variant="bordered" css={{ background: 'transparent' }}>
        <Card.Body>
          <Table
            id="device-list"
            aria-label="Device list"
            css={{ width: '100%' }}
          >
            <Table.Header>
              <Table.Column>Status</Table.Column>
              <Table.Column>Queries</Table.Column>
            </Table.Header>
            {RenderedItems}
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AnalyticsStatus;
