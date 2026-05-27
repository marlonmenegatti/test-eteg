import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/success')({
  component: SuccessPage,
})

function SuccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-6">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Cadastro Realizado!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">Usuário cadastrado com sucesso.</p>
          <Link to="/">
            <Button className="w-full">Voltar ao Início</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
