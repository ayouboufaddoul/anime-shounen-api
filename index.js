import express from "express";
import {readFile} from "fs/promises";

const app=express();
app.use(express.json());
app.use(express.static("./imgs"));

let f=null;
function r(anime){
    return {
                id:anime.id,
                name:anime.name,
                genres:anime.genres,
                imgsP:(anime.imgsP !== "H.png" ? `http://localhost:3000/65${anime.imgsP}89/${anime.imgId}`:"http://localhost:3000/H.png"),
                engName:anime.engName,
                synonyms:anime.synonyms,
                jpName:anime.jpName,
                frName:anime.frName,
                type:anime.type,
                ep:anime.ep,
                status:anime.status,
                premiered:anime.premiered,
                studios:anime.studios,
                source:anime.source,
                themes:anime.themes,
                duration:anime.duration,
                rating:anime.rating,
                score:anime.score,
                yt:anime.yt,
                synopsis:anime.synopsis,
                background:anime.background
            };
}
async function rf(){
    const a=await readFile("./6589.json",{encoding:"utf-8"});
    f=JSON.parse(a);
    for(let i=0;i<f.length;i++)
        f[i]=r(f[i]);
}
rf();
app.get("/anime/",(req,res)=>{
    if(f){
        return res.json(f);
    }
});

app.get("/anime/:name",(req,res)=>{
    if(f){
        let y=[];
        for(let anime of f){
            const reg=new RegExp(`.*${req.params.name}.*`,"i");
            if(reg.test(anime.name) || reg.test(anime.engName) || reg.test(anime.synonyms) || reg.test(anime.jpName) || reg.test(anime.frName)){
                y.push(anime);
            }
        }
        return res.json(y);
    }
    else{
        return res.status(500).json({success:false,message:"Error"});
    }
});

app.get("/anime/type/:t",(req,res)=>{
    if(f){
        let y=[];
        for(let anime of f){
            const reg=new RegExp(`.*${req.params.t}.*`,"i");
            if(reg.test(anime.type)){
                y.push(anime);
            }
        }
        return res.json(y);
    }
    else{
        return res.status(500).json({success:false,message:"Error"});
    }
});


app.get("/anime/genre/:g",(req,res)=>{
    if(f){
        let y=[];
        for(let anime of f){
            const reg=new RegExp(`.*${req.params.g}.*`,"i");
            if(reg.test(anime.genres)){
                y.push(anime);
            }
        }
        return res.json(y);
    }
    else{
        return res.status(500).json({success:false,message:"Error"});
    }
});


app.get("/anime/score/:s",(req,res)=>{
    if(f){
        let y=[];
        for(let anime of f){
            const reg=new RegExp(`^${req.params.s}.*`,"i");
            if(reg.test(anime.score)){
                y.push(anime);
            }
        }
        return res.json(y);
    }
    else{
        return res.status(500).json({success:false,message:"Error"});
    }
});

app.get("/anime/rating/:r",(req,res)=>{
    if(f){
        let y=[];
        for(let anime of f){
            const reg=new RegExp(`^${req.params.r}.*`,"i");
            if(reg.test(anime.rating)){
                y.push(anime);
            }
        }
        return res.json(y);
    }
    else{
        return res.status(500).json({success:false,message:"Error"});
    }
});

app.get("/anime/studios/:s",(req,res)=>{
    if(f){
        let y=[];
        for(let anime of f){
            const reg=new RegExp(`.*${req.params.s}.*`,"i");
            if(reg.test(anime.studios)){
                y.push(anime);
            }
        }
        return res.json(y);
    }
    else{
        return res.status(500).json({success:false,message:"Error"});
    }
});

app.get("/anime/theme/:t",(req,res)=>{
    if(f){
        let y=[];
        for(let anime of f){
            const reg=new RegExp(`.*${req.params.t}.*`,"i");
            if(reg.test(anime.themes)){
                y.push(anime);
            }
        }
        return res.json(y);
    }
    else{
        return res.status(500).json({success:false,message:"Error"});
    }
});

app.get("/anime/episodes/:ep",(req,res)=>{
    if(f){
        let y=[];
        for(let anime of f){
            const reg=new RegExp(`.*${req.params.ep}.*`,"i");
            if(reg.test(anime.ep)){
                y.push(anime);
            }
        }
        return res.json(y);
    }
    else{
        return res.status(500).json({success:false,message:"Error"});
    }
});

app.use((err,req,res,next)=>{
    const sc= err.statusCode || 500;
    let m= err.message || "Internal Server Error";
    console.error(`Error
Status : ${sc}
Message : ${m} 
${"-".repeat(26)}
    `);
    if(sc === 500)
        m ="Internal Server Error";
    return res.status(sc).json({
        success:false,
        status:sc,
        message:m
    });
});

app.listen(3000,()=>{
    console.log("Nice...");
});