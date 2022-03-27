import {
  getInitials,
  toastErrors,
  usePagination,
  useRequest,
  UserService,
  useUsers,
} from "@lib";
import { LockReset, ToggleOff, ToggleOn } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Chip,
  IconButton,
  Link as MaterialLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { UserModel } from "@types";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "..";
import { IUser } from "./IUser";
import { UserEditForm } from "./UserForm";

export const UserListResults: FC<IUser.UserListResultsProps> = (props) => {
  const { users } = props;
  const { data: session } = useSession();
  const { mutate } = useUsers();
  const [open, setOpen] = useState(false);
  const { limit, onLimitChange, onPageChange, page } = usePagination({
    initialLimit: 10,
    initialPage: 0,
  });
  const [currentUser, setCurrentUser] = useState<UserModel.UserResponse>();

  const { doRequest, loading } = useRequest<UserModel.UserResponse>({
    request: UserService.update,
    onSuccess: (data) => {
      toast.success("Estado actualizado");
      mutate();
    },
    onError: (error) => {
      toastErrors(error);
    },
  });

  const toggleStatus = (currentStatus: boolean, id: string) => {
    doRequest({ status: !currentStatus }, id);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentUser(undefined);
    mutate();
  };

  if (!users) return null;

  return (
    <Card>
      <Box sx={{ minWidth: 375 }} className="container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="normal"></TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Historial</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.slice(0, limit).map((user) => (
              <TableRow hover key={user.id}>
                <TableCell padding="normal">
                  <Tooltip title="Cambiar Contraseña">
                    <IconButton
                      color="primary"
                      aria-label="editar"
                      onClick={() => {
                        setOpen(true);
                        setCurrentUser(user);
                      }}
                    >
                      <LockReset />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell padding="normal">
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Avatar sx={{ mr: 2, bgcolor: "InfoText" }}>
                      {getInitials(`${user.firstName} ${user.lastName}`)}
                    </Avatar>
                    <div>
                      <Typography color="textPrimary" variant="body1">
                        {user.firstName} {user.lastName}
                      </Typography>

                      <Typography color="GrayText" variant="body2">
                        {user.email}
                      </Typography>

                      <Link
                        href={`/panel/perfil/${user.id}`}
                        passHref
                        withAnchor={false}
                      >
                        <MaterialLink
                          variant="subtitle2"
                          color="GrayText"
                          underline="hover"
                        >
                          Ver Perfil
                        </MaterialLink>
                      </Link>
                    </div>
                  </Box>
                </TableCell>

                <TableCell padding="normal">{user.role.name}</TableCell>

                <TableCell>
                  {user.status ? (
                    <Chip
                      icon={<ToggleOn />}
                      color="success"
                      label="Activo"
                      onClick={() => toggleStatus(user.status, user.id)}
                      disabled={loading || session?.user?.id === user.id}
                    />
                  ) : (
                    <Chip
                      icon={<ToggleOff />}
                      color="default"
                      label="Inactivo"
                      onClick={() => toggleStatus(user.status, user.id)}
                      disabled={loading}
                    />
                  )}
                </TableCell>

                <TableCell>
                  <Typography variant="caption" display="block">
                    Creado el
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {format(new Date(user.createdAt), "Pp")}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Última actualización
                  </Typography>
                  <Typography variant="subtitle2" display="block">
                    {format(new Date(user.updatedAt), "Pp")}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={users.length}
        onPageChange={onPageChange}
        onRowsPerPageChange={onLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {currentUser && (
        <UserEditForm
          currentUser={currentUser}
          open={open}
          onClose={handleClose}
        />
      )}
    </Card>
  );
};
