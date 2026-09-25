function MemberCard({ name, role, message }) {
  return (
    <article className="rounded-lg border border-gray-200 p-4 shadow-sm">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-gray-500">{role}</p>
      <p>{message}</p>
    </article>
  );
}

export default MemberCard;