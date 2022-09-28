import {
  Badge,
  Button,
  Card,
  Grid,
  Text,
  Link as NextLink
} from '@nextui-org/react';
import { FC } from 'react';
import { Profile } from '../shared/constants/models/profile.model';

interface IProps extends Profile {}

const ProfileCard: FC<IProps> = ({ id, name, role }) => {
  return (
    <Card css={{ height: '100%' }}>
      <Card.Header>
        <Badge>{role}</Badge>
      </Card.Header>
      <Card.Divider></Card.Divider>
      <Card.Body>
        <Grid.Container gap={2} justify="center" alignItems="center">
          <Grid>
            <Text>{name}</Text>
          </Grid>
          <Grid>
            <NextLink href={`/profiles/${id}`}>
              <Button size="sm">View</Button>
            </NextLink>
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
