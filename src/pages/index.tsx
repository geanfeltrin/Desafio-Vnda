import { NextPage } from 'next';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Table from '../components/Table';

import DefaultLayout from '../layouts/Default';
import Link from 'next/link';
import { User } from '../interfaces/index';
import { getUsers } from './api/getUsers';

interface HomeProps {
  users?: User[];
  errors?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    header: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(4),

      marginRight: theme.spacing(1),
    },
  })
);

const Home: NextPage<HomeProps> = ({ users }: HomeProps) => {
  const classes = useStyles();

  return (
    <DefaultLayout>
      <>
        <Grid container spacing={3} className={classes.header}>
          <Typography variant="h4" component="h2">
            Usuários
          </Typography>
          <Link href="/user/create-user">
            <Button variant="contained" color="primary">
              Adicionar Usuário
            </Button>
          </Link>
        </Grid>
        {users && <Table data={users} />}
      </>
    </DefaultLayout>
  );
};

export const getServerSideProps = async (): Promise<{
  props: HomeProps;
}> => {
  try {
    const response = await getUsers();
    return { props: { users: response } };
  } catch (e) {
    return {
      props: {
        errors: 'Houve um erro ao buscar os dados',
      },
    };
  }
};

export default Home;
