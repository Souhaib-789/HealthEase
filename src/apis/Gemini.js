import axios from "axios"

const API_KEY = 'AIzaSyA2i3Cy1gm8qIxg_mmn3DoVzOWPzLhZEhU'
const GOOGLE_API = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key='



export const askHealthbot = async (prompt) => {
    try {
        const response = await axios.post(GOOGLE_API + API_KEY, {
            "contents": [{
                "parts": [{ "text": `You have to give healthy diet or food advice only of the following question . The question is: ${prompt}` }
                ]
            }]
        }
        )
        // console.log(response.data?.candidates[0]?.content?.parts[0]?.text);
        return response.data?.candidates[0]?.content?.parts[0]?.text
    } catch (error) {
        console.error(error)
    }
}