import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { type ApiError, createUser, fetchActiveColors } from '@/lib/api'
import { isValidCPF, maskCPF, unmaskCPF } from '@/lib/utils'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/register')({
  loader: async () => {
    const colors = await fetchActiveColors()
    return { colors }
  },
  component: RegisterPage,
})

function RegisterPage() {
  const { colors } = Route.useLoaderData()
  const router = useRouter()
  const [modalError, setModalError] = useState<string | null>(null)
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({})

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      router.navigate({ to: '/success' })
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError
      if (apiError?.field) {
        setServerErrors({ [apiError.field]: apiError.message })
      }
      setModalError(apiError?.message || 'Erro ao cadastrar usuário')
    },
  })

  const form = useForm({
    defaultValues: {
      fullName: '',
      cpf: '',
      email: '',
      favoriteColorId: '',
      notes: '',
    },
    onSubmit: async ({ value }) => {
      setServerErrors({})
      mutation.mutate({
        fullName: value.fullName,
        cpf: unmaskCPF(value.cpf),
        email: value.email,
        favoriteColorId: Number(value.favoriteColorId),
        notes: value.notes || undefined,
      })
    },
  })

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Cadastro de Usuário</CardTitle>
          <CardDescription>Preencha os dados abaixo para se cadastrar</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo</Label>
              <form.Field
                name="fullName"
                validators={{
                  onChange: ({ value }) =>
                    !value.trim() ? 'Nome completo é obrigatório' : undefined,
                }}
              >
                {(field) => (
                  <>
                    <Input
                      id="fullName"
                      placeholder="Digite seu nome completo"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(e.target.value)
                        setServerErrors({})
                      }}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {String(field.state.meta.errors[0])}
                      </p>
                    )}
                    {serverErrors.fullName && (
                      <p className="text-sm text-destructive">{serverErrors.fullName}</p>
                    )}
                  </>
                )}
              </form.Field>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <form.Field
                name="cpf"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'CPF é obrigatório'
                    if (value.replace(/\D/g, '').length !== 11) return 'CPF deve ter 11 dígitos'
                    if (!isValidCPF(value)) return 'CPF inválido'
                    return undefined
                  },
                }}
              >
                {(field) => (
                  <>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(maskCPF(e.target.value))
                        setServerErrors({})
                      }}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {String(field.state.meta.errors[0])}
                      </p>
                    )}
                    {serverErrors.cpf && (
                      <p className="text-sm text-destructive">{serverErrors.cpf}</p>
                    )}
                  </>
                )}
              </form.Field>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    if (!value.trim()) return 'E-mail é obrigatório'
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'E-mail inválido'
                    return undefined
                  },
                }}
              >
                {(field) => (
                  <>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Digite seu e-mail"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(e.target.value)
                        setServerErrors({})
                      }}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {String(field.state.meta.errors[0])}
                      </p>
                    )}
                    {serverErrors.email && (
                      <p className="text-sm text-destructive">{serverErrors.email}</p>
                    )}
                  </>
                )}
              </form.Field>
            </div>

            <div className="space-y-2">
              <Label>Cor Preferida</Label>
              <form.Field
                name="favoriteColorId"
                validators={{
                  onChange: ({ value }) => (!value ? 'Selecione uma cor' : undefined),
                }}
              >
                {(field) => (
                  <>
                    <Select
                      value={field.state.value}
                      onValueChange={(val) => {
                        field.handleChange(val)
                        setServerErrors({})
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione sua cor preferida" />
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color.id} value={String(color.id)}>
                            <div className="flex items-center gap-2">
                              <span
                                className="inline-block h-4 w-4 rounded-full border"
                                style={{ backgroundColor: color.hex }}
                              />
                              {color.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {String(field.state.meta.errors[0])}
                      </p>
                    )}
                    {serverErrors.favoriteColorId && (
                      <p className="text-sm text-destructive">{serverErrors.favoriteColorId}</p>
                    )}
                  </>
                )}
              </form.Field>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <form.Field name="notes">
                {(field) => (
                  <Textarea
                    id="notes"
                    placeholder="Observações adicionais (opcional)"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              </form.Field>
            </div>

            <form.Subscribe
              selector={(state) => {
                const v = state.values
                return (
                  v.fullName.trim() !== '' &&
                  v.cpf.replace(/\D/g, '').length === 11 &&
                  v.email.trim() !== '' &&
                  v.favoriteColorId !== ''
                )
              }}
            >
              {(isComplete) => (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isComplete || mutation.isPending}
                >
                  {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  {mutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>

      <Dialog open={!!modalError} onOpenChange={(open) => !open && setModalError(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Erro no Cadastro</DialogTitle>
            <DialogDescription>{modalError}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalError(null)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
