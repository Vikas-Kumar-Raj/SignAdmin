import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const RevenueChart = ({ transactions }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = months.map((month, index) => {
    const revenue = transactions
      .filter((item) => {
        const date = new Date(item.transactionDate);
        return date.getMonth() === index;
      })
      .reduce((sum, item) => sum + item.amount, 0);

    return {
      month,
      revenue,
    };
  });

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">

      <div className="mb-6">

        <h2 className="text-xl font-bold">
          Revenue Growth
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Monthly Revenue Analytics
        </p>

      </div>

      <ResponsiveContainer width="100%" height={320}>

        <AreaChart data={chartData}>

          <defs>

            <linearGradient
              id="colorRevenue"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#2563eb"
                stopOpacity={0.8}
              />

              <stop
                offset="95%"
                stopColor="#2563eb"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
};

export default RevenueChart;