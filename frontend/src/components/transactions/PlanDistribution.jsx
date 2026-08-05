import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
];

const PlanDistribution = ({ transactions }) => {
  const data = [
    {
      name: "Enterprise Elite",
      value: transactions.filter(
        (item) => item.plan === "Enterprise Elite"
      ).length,
    },
    {
      name: "Professional",
      value: transactions.filter(
        (item) => item.plan === "Professional"
      ).length,
    },
    {
      name: "Standard",
      value: transactions.filter(
        (item) => item.plan === "Standard"
      ).length,
    },
  ];

  const total = transactions.length;

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">

      <div className="mb-6">

        <h2 className="text-xl font-bold">
          Plan Distribution
        </h2>

        <p className="text-gray-500 text-sm">
          Subscription Overview
        </p>

      </div>

      <ResponsiveContainer width="100%" height={280}>

        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            label
          >

            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

      <div className="mt-6 space-y-4">

        {data.map((item, index) => {

          const percentage =
            total === 0
              ? 0
              : ((item.value / total) * 100).toFixed(1);

          return (

            <div key={index}>

              <div className="flex justify-between mb-2">

                <span className="font-medium">
                  {item.name}
                </span>

                <span>
                  {item.value} Users
                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">

                <div
                  className="h-3 rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: COLORS[index],
                  }}
                />

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
};

export default PlanDistribution;