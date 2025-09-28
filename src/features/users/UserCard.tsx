import React from "react";
import { Card, Button, Avatar, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
};

type Props = {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
};

const UserCard: React.FC<Props> = ({ user, onEdit, onDelete }) => {
  return (
    <Card
      hoverable
      style={{ textAlign: "center", padding: 24,  boxShadow: "0 4px 16px rgba(0,0,0,0.2)", // stronger shadow
 }}
      cover={
        <Avatar
          size={96}
          shape="circle"
          src={
            user.avatar ||
            "/placeholder.svg?height=160&width=160&query=user avatar headshot"
          }
          alt={`${user.first_name} ${user.last_name}`}
          style={{
            margin: "0 auto",
            objectFit: "cover", 
            borderRadius: "50%",
            overflow: "hidden", 
          }}
        />
      }
    >
      <h3 style={{ marginTop: 16 }}>
        {user.first_name} {user.last_name}
      </h3>
      <p style={{ color: "rgba(0,0,0,0.45)" }}>{user.email}</p>

      <Space style={{ marginTop: 16 }}>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={onEdit}
        />
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={onDelete}
        />
      </Space>
    </Card>
  );
};

export default UserCard;
