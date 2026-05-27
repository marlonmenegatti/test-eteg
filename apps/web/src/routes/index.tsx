import { createFileRoute, Link } from '@tanstack/react-router'
import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Bem-vindo</CardTitle>
          <CardDescription>Sistema de cadastro de usuários</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Link to="/register">
            <Button size="lg" className="gap-2">
              <UserPlus className="h-5 w-5" />
              Cadastrar Usuário
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
