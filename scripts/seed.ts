const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function Main() {
    try {
        await database.category.createMany({
            data:[
                {name:"Computer Science"},
                {name:"Music"},
                {name:"Fitness"},
                {name:"Photography"},
                {name:"Accounting"},
                {name:"Engineering"},
                {name:"Filming"},
            ]
        });
        console.log("Success");
    } catch (error) {
     console.log("Error Seeding the database categories", Error);   
    }finally{
        await database.$disconnect();
    }
}

Main();