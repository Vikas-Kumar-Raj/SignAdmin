const UserCard = ({
  title,
  value,
  subtitle,
  icon,
  color,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-xs uppercase tracking-wide text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

          <p className="text-sm text-green-600 mt-1">
            {subtitle}
          </p>

        </div>

        <div
          className={`w-14 h-14 rounded-lg flex items-center justify-center ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};

export default UserCard;