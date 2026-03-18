import { Avatar } from './index';

export default {
  title: "Primitives/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large", "xlarge"],
    },
    shape: {
      control: "select",
      options: ["circle", "square"],
    },
  },
};

export const WithImage = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    alt: "User avatar",
  },
};

export const WithInitials = {
  args: {
    children: "JD",
    backgroundColor: "#3b82f6",
    color: "#fff",
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar
        size="small"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        alt="Small"
      />
      <Avatar
        size="medium"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        alt="Medium"
      />
      <Avatar
        size="large"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        alt="Large"
      />
      <Avatar
        size="xlarge"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        alt="Extra Large"
      />
    </div>
  ),
};

export const Shapes = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar
        shape="circle"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        alt="Circle"
      />
      <Avatar
        shape="square"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        alt="Square"
      />
    </div>
  ),
};

export const InitialsSizes = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar size="small" backgroundColor="#ef4444" color="#fff">
        SM
      </Avatar>
      <Avatar size="medium" backgroundColor="#8b5cf6" color="#fff">
        MD
      </Avatar>
      <Avatar size="large" backgroundColor="#10b981" color="#fff">
        LG
      </Avatar>
      <Avatar size="xlarge" backgroundColor="#f59e0b" color="#fff">
        XL
      </Avatar>
    </div>
  ),
};

export const CustomColors = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Avatar backgroundColor="#ef4444" color="#fff">
        AB
      </Avatar>
      <Avatar backgroundColor="#f59e0b" color="#fff">
        CD
      </Avatar>
      <Avatar backgroundColor="#10b981" color="#fff">
        EF
      </Avatar>
      <Avatar backgroundColor="#3b82f6" color="#fff">
        GH
      </Avatar>
      <Avatar backgroundColor="#8b5cf6" color="#fff">
        IJ
      </Avatar>
      <Avatar backgroundColor="#ec4899" color="#fff">
        KL
      </Avatar>
    </div>
  ),
};

export const DefaultImage = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar alt="No image provided" />
      <Avatar size="large" alt="No image provided" />
    </div>
  ),
};

export const UserList = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {[
        { name: "John Doe", initials: "JD", color: "#3b82f6" },
        { name: "Jane Smith", initials: "JS", color: "#10b981" },
        { name: "Bob Wilson", initials: "BW", color: "#f59e0b" },
        { name: "Alice Brown", initials: "AB", color: "#ec4899" },
      ].map((user) => (
        <div
          key={user.initials}
          style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
        >
          <Avatar backgroundColor={user.color} color="#fff">
            {user.initials}
          </Avatar>
          <span style={{ fontWeight: "500" }}>{user.name}</span>
        </div>
      ))}
    </div>
  ),
};

export const AvatarGroup = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        style={{ marginLeft: 0 }}
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
        style={{ marginLeft: "-12px", border: "2px solid white" }}
      />
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
        style={{ marginLeft: "-12px", border: "2px solid white" }}
      />
      <Avatar
        backgroundColor="#6b7280"
        color="#fff"
        style={{ marginLeft: "-12px", border: "2px solid white" }}
      >
        +5
      </Avatar>
    </div>
  ),
};
