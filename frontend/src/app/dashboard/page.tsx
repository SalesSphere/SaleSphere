import RepLeaderboard from "@/components/rep-leaderboard";
import SalesChart from "@/components/sales-chart";
import SalesTable from "@/components/sales-table";
import StatsCard from "@/components/stats-card";
import MemoPlus from "@/icons/Plus";
import MemoSearch from "@/icons/Search";
import MemoUserProfile from "@/icons/UserProfile";

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome Chinyere 👋</h1>
          <p className="text-[#292D3280] text-sm">
            Dive into real-time insights and watch your sales soar
          </p>
        </div>
        <div className="flex gap-4 md:gap-6 mt-4 md:mt-0">
          <button className="inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#292D3208] text-[#FFFFFF]  h-10 px-4 py-2">
            <MemoSearch className="h-10 w-10" />
          </button>
          <button className="inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-[#292D3208] text-[#292D32B2] hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            <MemoUserProfile className="h-4 w-4 mr-2" />
            Add new user
          </button>
          <button className="inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#17ABEC] text-[#FFFFFF] hover:bg-[#9dd3ea] h-10 px-4 py-2">
            <MemoPlus className="h-4 w-4 mr-2" />
            Add new Product
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Total Product"
          value="2,000"
          change={-20}
          data={[30, 25, 35, 30, 22, 20, 18, 15, 17, 16]}
          period="Last 360 days"
          type="Decreased by"
          lineColor="#FF1900"
        />
        <StatsCard
          title="Total sales"
          value="5,000"
          change={20}
          data={[30, 25, 55, 30, 22, 20, 18, 15, 17, 16]}
          period="Last 360 days"
          type="Increased by"
          lineColor="#00D103"
        />
        <StatsCard
          title="Total Member"
          value="10"
          change={0}
          data={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          period="Last 360 days"
          type="Static"
          lineColor="#E2AE29"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-4 p-3">
        <div className="md:col-span-3">
          <SalesChart />
        </div>
        <RepLeaderboard />
      </div>

      <SalesTable />
    </div>
  );
}
