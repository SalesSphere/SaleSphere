import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MemoArrowDown from "@/icons/ArrowDown";
import MemoArrowUp from "@/icons/ArrowUp";
import Image from "next/image";

export default function RepLeaderboard() {
  return (
    <Card className="w-full max-w-[22rem]">
      <CardHeader>
        <CardTitle className="text-base font-medium text-[#292D3280]">
          Rep Leaderboard
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div
          className="grid grid-cols-3 bg-[#292D321A] p-3"
          style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
          <div className="text-sm font-medium">Sales rep</div>
          <div className="text-sm font-medium">No of sale</div>
        </div>
        <div className="divide-y">
          <div
            className="grid grid-cols-3 items-center p-3"
            style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
            <div className="flex items-center gap-2">
              <Image src="/1.png" width={20} height={20} alt="rep1" />
              <span>Boma Pakabo</span>
            </div>
            <div className="flex items-center justify-center">85</div>
            <div className="flex justify-center">
              <MemoArrowUp className="h-4 w-4 text-green-500" />
            </div>
          </div>
          <div
            className="grid grid-cols-3 items-center p-3"
            style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
            <div className="flex items-center gap-2">
              <Image src="/2.png" width={20} height={20} alt="rep2" />
              <span>Funke Iwalewa</span>
            </div>
            <div className="flex items-center justify-center">80</div>
            <div className="flex justify-center">
              <MemoArrowDown className="h-4 w-4 text-red-500" />
            </div>
          </div>
          <div
            className="grid grid-cols-3 items-center p-3"
            style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
            <div className="flex items-center gap-2">
              <Image src="/3.png" width={20} height={20} alt="rep3" />
              <span>Adeola Olaniyan</span>
            </div>
            <div className="flex items-center justify-center">70</div>
            <div className="flex justify-center"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
