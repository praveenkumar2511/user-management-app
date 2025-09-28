import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../storeHooks';
import './UserList.css';
import { fetchUsers, createUser, updateUser, deleteUser } from '../features/users/usersSlice';
import { Button, Row, Col, Input, Pagination, Space, Table, Avatar, Segmented } from 'antd';
import UserModal from '../features/users/ UserModal';
import UserCard from '../features/users/UserCard';
import type { User } from '../features/users/types';
import { App } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Loader from '../components/Loader';
const UsersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modal, message } = App.useApp();
  const { list, loading } = useAppSelector((s) => s.users);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 6;
  const [viewCard, setViewCard] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filtered = useMemo(() => {
    const arr = list || [];
    if (!query) return arr;
    const q = query.toLowerCase().trim();
    return arr.filter((u) => (u.first_name + ' ' + u.last_name).toLowerCase().includes(q));
  }, [list, query]);

  const paged = useMemo(() => {
    const arr = filtered || [];
    const start = (page - 1) * perPage;
    return arr.slice(start, start + perPage);
  }, [filtered, page]);

  const openCreate = () => {
    setEditing(null);
    setModalVisible(true);
  };
  const openEdit = (user: User) => {
    console.log(user, 'edit user');

    setEditing(user);
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    modal.confirm({
      title: 'Delete user?',
      content: 'This action is irreversible.',
      onOk: async () => {
        const res = await dispatch(deleteUser(id));
        if (res.meta.requestStatus === 'fulfilled') message.success('Deleted');
        else message.error(typeof res.payload === 'string' ? res.payload : 'Error');
      },
    });
  };

  const onModalSubmit = async (formData: Partial<User>) => {
    if (editing?.id) {
      const res = await dispatch(updateUser({ id: editing.id, payload: formData }));
      if (res.meta.requestStatus === 'fulfilled') {
        message.success('Updated');
        setModalVisible(false);
      } else message.error(typeof res.payload === 'string' ? res.payload : 'Error');
    } else {
      const res = await dispatch(createUser(formData));
      if (res.meta.requestStatus === 'fulfilled') {
        message.success('Created');
        setModalVisible(false);
      } else message.error(typeof res.payload === 'string' ? res.payload : 'Error');
    }
  };

  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string, record: User) => (
        <Avatar
          src={avatar || '/placeholder.svg?height=160&width=160&query=user avatar headshot'}
          alt={`${record.first_name} ${record.last_name}`}
          size={48}
          shape="circle"
        />
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },

    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: User) => (
        <Space>
          <Button type="primary" size="large" onClick={() => openEdit(record)}>
            Edit
          </Button>

          <Button
            type="primary"
            danger
            size="large"
            onClick={() => handleDelete(Number(record.id))}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: 20,
        // border: "1px solid #e0e0e0",
        borderRadius: 8,
        backgroundColor: '#fff',
      }}
    >
      <div
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: 20,
          boxShadow: `
    0 12px 48px rgba(0,0,0,0.3), 
    0 4px 16px rgba(0,0,0,0.2)    /* subtle additional layer */
  `,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            marginBottom: 12,
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: 20,
              borderRadius: 8,
            }}
          >
            <h1 style={{ color: '#000', fontWeight: 'bold', fontSize: '2rem' }}>Users</h1>{' '}
            <Row justify="space-between" align="middle" style={{ marginBottom: 12, gap: 10 }}>
              <Col>
                <Space>
                  <Input.Search
                    placeholder="Search by name"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setPage(1);
                    }}
                    style={{ width: 300 }}
                  />
                </Space>
              </Col>
              <Col>
                <Button type="primary" onClick={openCreate}>
                  Create User
                </Button>
              </Col>
            </Row>
          </div>
          <div style={{ marginBottom: 24 }}>
            <Segmented
              value={viewCard ? 'Card' : 'Table'}
              onChange={(val) => setViewCard(val === 'Card')}
              options={[
                {
                  label: 'Table',
                  value: 'Table',
                  icon: <UnorderedListOutlined />,
                },
                {
                  label: 'Card',
                  value: 'Card',
                  icon: <AppstoreOutlined />,
                },
              ]}
              className="custom-segmented"
            />
          </div>
        </div>

        {loading ? (
          <Loader tip="Fetching users..." />
        ) : viewCard ? (
          <Row gutter={[16, 16]}>
            {paged?.map((u: User) => (
              <Col xs={24} sm={12} md={8} lg={6} key={u.id}>
                <UserCard
                  user={{
                    ...u,
                    id: Number(u.id),
                  }}
                  onEdit={() => openEdit(u)}
                  onDelete={() => handleDelete(Number(u.id))}
                />
              </Col>
            ))}
          </Row>
        ) : (
          //       <div
          //         style={{
          //           border: "1px solid #e0e0e0",
          //           borderRadius: 8,
          //           boxShadow: `
          //   0 12px 48px rgba(0,0,0,0.3),
          //   0 4px 16px rgba(0,0,0,0.2)    /* subtle additional layer */
          // `,
          //         }}
          //       >
          <Table rowKey="id" dataSource={paged} columns={columns} pagination={false} />
          // </div>
        )}

        <UserModal
          visible={modalVisible}
          initial={editing}
          onCancel={() => setModalVisible(false)}
          onSubmit={onModalSubmit}
        />
      </div>
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          textAlign: 'right',
          justifyContent: 'flex-end',
        }}
      >
        <Pagination
          current={page}
          pageSize={perPage}
          total={filtered.length}
          onChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
};

export default UsersList;
