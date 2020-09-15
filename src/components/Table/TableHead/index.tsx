import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

type idData = 'id' | 'name' | 'email' | 'external_code' | 'edit';

interface HeadCell {
  disablePadding: boolean;
  id: idData;
  label: string;
  align: 'left' | 'right' | 'center';
  disableSort: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'id',
    disableSort: false,
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Nome',
    disableSort: false,
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: false,
    label: 'E-mail',
    disableSort: false,
  },
  {
    id: 'external_code',
    align: 'left',
    disablePadding: false,
    label: 'Código externo',
    disableSort: false,
  },
  {
    id: 'edit',
    align: 'center',
    disablePadding: true,
    label: 'Editar | Deletar',
    disableSort: true,
  },
];

const TableHeadComponent: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;
