import app from "./app.js";

app.listen(process.env.PORT, ()=>{
    console.log(`SERVIDOR RODANDO NA PORTA ${process.env.PORT}`);
})
