const User = ({ user }) => {
  return <p key={user.id}>{user.name}</p>;
};
export default User;
