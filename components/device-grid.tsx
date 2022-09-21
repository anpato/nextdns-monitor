import {
  Card,
  Container,
  Loading,
  Spacer,
  Table,
  Text
} from '@nextui-org/react';
import { FC } from 'react';
import { Device } from '../constants/models/device.model';

type IProps = {
  devices: Device[];
  isLoading: boolean;
};

const DeviceGrid: FC<IProps> = ({ devices, isLoading }) => {
  let RenderedItems = (
    <Table.Body>
      <Table.Row>
        <Table.Cell>{null}</Table.Cell>
        <Table.Cell>
          <Loading />
        </Table.Cell>
        <Table.Cell>{null}</Table.Cell>
      </Table.Row>
    </Table.Body>
  );
  if (!isLoading) {
    RenderedItems = (
      <Table.Body items={devices}>
        {devices.map((device) => (
          <Table.Row key={device.id}>
            <Table.Cell>{device.name}</Table.Cell>
            <Table.Cell>{device.localIp}</Table.Cell>
            <Table.Cell>{device.queries}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    );
  }
  return (
    <Container>
      <Spacer />
      <Text h3>Connected Devices</Text>
      <Card variant="bordered" css={{ background: 'transparent' }}>
        <Card.Body>
          <Table id="device-list" aria-label="Device list">
            <Table.Header>
              <Table.Column>Name</Table.Column>
              <Table.Column>Ip Address</Table.Column>
              <Table.Column>Queries</Table.Column>
            </Table.Header>
            {RenderedItems}
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DeviceGrid;
