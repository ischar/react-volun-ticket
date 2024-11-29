export default function PostListItem({ title, recruitPeriod, current, total }) {
  return (
    <div className="flex flex-row border-b-2 justify-between">
      <p>{title}</p>
      <div>
        <p>
          {current}/{total}
        </p>
        <p>{recruitPeriod}</p>
        <button>삭제</button>
      </div>
    </div>
  );
}
