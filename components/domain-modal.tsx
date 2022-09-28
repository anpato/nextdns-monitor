import {
  Badge,
  Collapse,
  Divider,
  Grid,
  Link,
  Modal,
  Navbar,
  Table,
  Text
} from '@nextui-org/react';
import { FC } from 'react';
import { ExtendedProfile } from '../shared/constants/models/profile.model';

type IProps = {
  isOpen: boolean;
  toggleOpen: (value: boolean) => void;
  blockList: ExtendedProfile['privacy']['blocklists'];
};

const DomainModal: FC<IProps> = ({ isOpen, toggleOpen, blockList = [] }) => {
  const generateCollapseTitle = (title: string, updatedDate: Date) => {
    return (
      <Grid.Container justify="space-between" gap={2}>
        <Grid>
          <Text h4>{title}</Text>
        </Grid>
        <Grid>
          <Text color="primary">{updatedDate.toDateString()}</Text>
        </Grid>
      </Grid.Container>
    );
  };

  return (
    <Modal open={isOpen} onClose={() => toggleOpen(false)} closeButton>
      <Modal.Header>
        <Text h4>Block Lists</Text>
      </Modal.Header>
      <Divider />
      <Modal.Body>
        <Collapse.Group>
          {blockList.map((list) => (
            <Collapse
              key={list.id}
              title={generateCollapseTitle(
                list.name || list.id,
                new Date(list.updatedOn)
              )}
            >
              <Divider />
              <Grid.Container gap={2} direction="column">
                <Grid.Container gap={2} justify="space-between">
                  <Grid>
                    <Text b>
                      Entries:{' '}
                      <Badge color="success">
                        <Text span>{list.entries}</Text>
                      </Badge>
                    </Text>
                  </Grid>
                  <Grid>
                    <Link
                      href={list.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View site
                    </Link>
                  </Grid>
                </Grid.Container>
                <Grid>
                  <Text>{list.description || 'No description.'}</Text>
                </Grid>
              </Grid.Container>
            </Collapse>
          ))}
        </Collapse.Group>
      </Modal.Body>
    </Modal>
  );
};

export default DomainModal;
