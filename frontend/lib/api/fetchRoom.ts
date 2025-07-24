export const fetchRoom = async (slug: string) => {
  const res = await fetch(`/api/rooms/${slug}`)
  if (!res.ok) {
    return
  }
  const data = await res.json()
  return data
}