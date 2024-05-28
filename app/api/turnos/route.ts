import { insertTurno } from "@/app/lib/data"

export async function POST(req: Request) {
  const { title, startTime, endTime, shiftDate} = await req.json()
  const data = await insertTurno(title, startTime, endTime, shiftDate);

  return Response.json(data)
}