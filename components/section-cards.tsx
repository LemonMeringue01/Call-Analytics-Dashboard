"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { useEffect, useState } from "react";



export function SectionCards() {

      const [data, setData] = useState(0);
      const [numCalls, setNumCalls] = useState(0);
      const [sumCost, setSumCost] = useState(0);
      const [avgDuration, setAvgDuration] = useState(0);
      const [totalSuccess, settotalSuccess] = useState(0);
      const [totalFail, settotalFail] = useState(0);
  
  
      useEffect(() => {
        async function fetchData() {
          const response = await fetch("https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr");
          const result = await response.json();
          setData(result);
        
          setNumCalls(result.length);
     
          let total = 0;
          for (let i = 0; i < result.length; i++) {
            total += Number(result[i].callCost);
          }
          total = total.toFixed(2);
  
          setSumCost(total);
   
  
          let length = 0;
          for (let i = 0; i<result.length; i++){
            length += Number(result[i].callDuration);
          }
          length = length/result.length;
          setAvgDuration(length);
  
          let success = 0;
          for (let i = 0; i<result.length; i++){
            if(result[i].callStatus == true){
              success+=1;
            }
          }
          settotalSuccess(success);
  
          let fail = 0;
          for (let i = 0; i<result.length; i++){
            if(result[i].callStatus == false){
              fail+=1;
            }
          }
          settotalFail(fail);
        }

        fetchData();

      }, []);
    
      

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Calls</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {numCalls}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Calls for the recorded time period.
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Call Cost</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {sumCost}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Cost of all calls in recorded time period.
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average Call Duration</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {avgDuration}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Average call duration across all recorded calls.
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Successful Calls</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalSuccess}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Number of successfully connecting calls.
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Failed Calls</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalFail}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Number of calls failing to connect.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
