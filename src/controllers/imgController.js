import CloudinaryService from "@/services/CloudinaryService";



export default async function imgController(file) {
    try {
        if (!file) throw new Error("Please Enter file.")
        return await CloudinaryService(file)

    } catch (error) {
        console.log("imgController :",error)
    }
}
