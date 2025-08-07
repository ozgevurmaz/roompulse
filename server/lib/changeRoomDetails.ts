import Room from "./models/room"

export const updateRoom = async (
  roomId: string,
  updateFields: Partial<Record<keyof typeof Room.schema.obj, any>>
) => {
  const updatedRoom = await Room.findByIdAndUpdate(roomId, updateFields, {
    new: true,
  })
  return updatedRoom
}