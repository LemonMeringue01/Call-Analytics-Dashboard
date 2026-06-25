// context/DataContext.tsx
"use client";
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/ui/mode-toggle"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

import { useEffect, useState } from "react"





export default function Page() {
    const [data, setData] = useState([]);
    const [numCalls, setNumCalls] = useState(null);
    const [longCall, setLongCall] = useState(null);


    useEffect(() => {
      async function fetchData() {
        const response = await fetch("https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr");
        const result = await response.json();
        setData(result);
        console.log("Hello World.");
      
        setNumCalls(result.length);
   

        let longCall = result[0].callDuration;
        for (let i = 1; i<result.length; i++){
          if(result[i].callDuration > longCall){
            longCall = result[i].callDuration;
          }
        }
        setLongCall(longCall);
      }
    
        fetchData();    

  }, []);



  return (
        <>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <h1>Calls Per Day</h1>
                  <ChartAreaInteractive />
                </div>


                <div className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Caller Name</TableHead>
                        <TableHead>caller Number</TableHead>
                        <TableHead>Reciever Number</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Call Direction</TableHead>
                        <TableHead>Call Status</TableHead>
                        <TableHead>Call Duration</TableHead>
                        <TableHead>Call Cost</TableHead>
                        <TableHead>Call Start Time</TableHead>
                        <TableHead>Call End Time</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {data.map((row) => (
                        <TableRow key={row.callerName}>
                          <TableCell>{row.callerName}</TableCell>
                          <TableCell>{row.callerNumber}</TableCell>
                          <TableCell>{row.receiverNumber}</TableCell>
                          <TableCell>{row.city}</TableCell>
                          <TableCell>{row.callDirection}</TableCell>
                          <TableCell>{row.callStatus}</TableCell>
                          <TableCell>{row.callDuration}</TableCell>
                          <TableCell>{row.callCost}</TableCell>
                          <TableCell>{row.callStartTime}</TableCell>
                          <TableCell>{row.callEndTime}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </>
  )
}

