import { PrismaClient } from '@prisma/client'


(async () => {
    const prisma = new PrismaClient()

    const teste = await prisma.transacao.create({
        data: {
            nome: "Internet",
            valor: 150,
            tipo: "Despesa",
            data: "11/09/2000",
            categoria: "Conta Fixa"
        }
        
    })
    console.log(teste)
})();

