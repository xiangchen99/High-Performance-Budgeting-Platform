import {Hono} from 'hono'
import {z} from 'zod'
import { zValidator } from '@hono/zod-validator'
import { idText } from 'typescript'
//we will use zod to validate the request body

type Expense = {
    id: number,
    title: string,
    amount: number
}

const fakeExpenses: Expense[] = [
    {id: 1, title: "Rent", amount: 1000},
    {id: 2, title: "Groceries", amount: 100},
    {id: 3, title: "Gas", amount: 50},
]

const createPostSchema = z.object({
    title: z.string().min(3).max(100),
    amount: z.number().int().positive()
})

export const expensesRoute = new Hono()
.get("/", (c) => {
    return c.json({expenses:fakeExpenses})
})
.post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = await c.req.valid("json")
    //... is spread operator so inputs the title and amount into the object
    fakeExpenses.push({...expense, id: fakeExpenses.length + 1})
    return c.json(expense)
})
.get("/:id", (c) => {
    const id = parseInt(c.req.params.id)
    const expense = fakeExpenses.find(e => e.id === id)
    if(!expense) {
        return c.status(404).json({error: "Expense not found"})
    }
    return c.json(expense)
}
//.delete
//.put