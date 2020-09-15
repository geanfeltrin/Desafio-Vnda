import React, { useState, useEffect } from 'react';
import { NextPageContext, NextPage } from 'next';
import { User, Tag } from '../../interfaces';
import api from '../../services/api';
import shortid from 'shortid';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  TextField,
  colors,
  Chip,
} from '@material-ui/core';
import Snackbar from '../../components/Snackbar';
import DefaultLayout from '../../layouts/Default/index';
import { showUser } from '../api/showUser';

interface Props {
  user?: User;
  errors?: string;
}

const useStyles = makeStyles(() => ({
  root: {},
  contentSaveButton: {
    padding: '16px',
  },
  saveButton: {
    color: '#fff',
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900],
    },
  },
  button: {
    marginTop: '8px',
    marginBottom: '8px',
  },
  chips: {
    margin: '2px',
  },
}));

const EditUser: NextPage<Props> = ({ user }) => {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBar, setSnackBar] = useState({
    message: '',
    type: 'success',
  });
  const [values, setValues] = useState({
    id: user?.id,
    name: user?.name,
    email: user?.email,
    external_code: user?.external_code,
    tag: '',
  });
  const [tags, setTags] = useState<Tag[]>([]);

  const [errorMsg, setErrorMsg] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (user?.tags) {
      const arrayOfTags = user.tags.map((tag) => ({
        id: shortid.generate(),
        name: tag,
      }));
      setTags(arrayOfTags);
    }
  }, []);

  const handleRemoveTag = (id: string) => {
    const arrayOftags = [...tags].filter((tag) => tag.id !== id);
    setTags([...arrayOftags]);
  };

  const handleAddTags = () => {
    if (values.tag) {
      setTags([...tags, { id: shortid.generate(), name: values.tag }]);
      setValues({ ...values, tag: '' });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    event.persist();

    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const msgError = (path: string, message: string) => {
    setErrorMsg((prevState) => {
      return {
        ...prevState,
        [path]: message,
      };
    });
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { name, email, external_code, id } = values;

      const arrayTagName = tags.map((tag) => tag.name);
      setErrorMsg({ name: '', email: '' });
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('O e-mail é obrigatório'),
      });
      await schema.validate(
        { name, email },
        {
          abortEarly: false,
        }
      );
      await api.patch(`/users/${id}`, {
        name,
        email,
        external_code,
        tags: arrayTagName,
      });

      setSnackBar({
        message: 'Usuário cadastrado com sucesso',
        type: 'success',
      });
      setOpenSnackbar(true);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          msgError(error.path, error.message);
        });
        setSnackBar({
          message:
            'Houve um erro ao cadastrar o usuário, preencha as informações corretamente',
          type: 'error',
        });
        setOpenSnackbar(true);
      } else {
        setSnackBar({
          message: 'Houve um erro ao cadastrar o usuário',
          type: 'error',
        });
        setOpenSnackbar(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <DefaultLayout>
      <>
        <Card className={classes.root}>
          <form onSubmit={handleSubmit}>
            <CardHeader title="Editar Usuário" />
            <Divider />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={!!errorMsg.name}
                    helperText={errorMsg.name}
                    fullWidth
                    label="Nome"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    error={!!errorMsg.email}
                    helperText={errorMsg.email}
                    label="E-mail"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Código externo"
                    name="external_code"
                    onChange={handleChange}
                    type="text"
                    value={values.external_code}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    label="Digite a tag"
                    name="tag"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.tag}
                    fullWidth
                  />
                  <Button
                    color="primary"
                    onClick={handleAddTags}
                    variant="outlined"
                    type="button"
                    className={classes.button}
                    disabled={!values.tag}
                    fullWidth
                  >
                    Adicionar tag
                  </Button>
                  <div>
                    {!!tags &&
                      tags.map((tag) => (
                        <Chip
                          key={tag.id}
                          label={tag.name}
                          onDelete={() => handleRemoveTag(tag.id)}
                          className={classes.chips}
                          color="primary"
                        />
                      ))}
                  </div>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions className={classes.contentSaveButton}>
              <Button
                className={classes.saveButton}
                type="submit"
                variant="contained"
              >
                Editar Usuário
              </Button>
            </CardActions>
          </form>
          <Snackbar
            onClose={handleSnackbarClose}
            open={openSnackbar}
            message={snackBar.message}
            type={snackBar.type === 'error' ? 'error' : 'success'}
          />
        </Card>
      </>
    </DefaultLayout>
  );
};

export const getServerSideProps = async (
  ctx: NextPageContext
): Promise<{
  props: { user?: User[]; errors?: string };
}> => {
  try {
    const id = ctx.query?.id;
    const response = await showUser(id);

    return { props: { user: response } };
  } catch (e) {
    return {
      props: {
        errors: 'Houve um erro ao buscar os dados',
      },
    };
  }
};

export default EditUser;
