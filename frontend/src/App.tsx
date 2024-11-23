import { useState, useEffect } from 'react'
import './App.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotal() {
      const res = await fetch("https://expense-tracker-backend-ramg.onrender.com/api/expenses/total-spent");
      const data = await res.json();
      setTotalSpent(data.totalSpent);
    }
    fetchTotal();
    console.log("fetched");
  }, [])

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
    </Card>
  )
}

export default App
