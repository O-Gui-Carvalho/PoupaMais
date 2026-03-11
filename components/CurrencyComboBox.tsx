"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { currencies, Currency } from "@/lib/currencies"
import { useMutation, useQuery } from "@tanstack/react-query"
import SkeletonWrapper from "./SkeletonWrapper"
import { UserSetting } from "@/lib/generated/prisma/client"
import { useCallback, useEffect, useState } from "react"
import { UpdateUserCurrency } from "@/app/wizard/_actions/userSettings"
import { toast } from "sonner"

export default function CurrencyComboBox() {
  const [selectedOption, setSelectedOption] = useState<string>("")

  const userSettings = useQuery<UserSetting>({
    queryKey: ["userSettings"],
    queryFn: () => fetch("/api/user-settings").then((res) => res.json()),
  })

  useEffect(() => {
    if (!userSettings.data) return
    const userCurrency = currencies.find(
      (currency) => currency.value === userSettings.data.currency
    )
    if (userCurrency) setSelectedOption(userCurrency.value)
  }, [userSettings.data])

  const mutation = useMutation({
    mutationFn: UpdateUserCurrency,
    onSuccess: (data: UserSetting) => {
      toast.success(`Moeda atualizada com sucesso!`, {
        id: "update-currency",
      })
      setSelectedOption(data.currency)
    },
    onError: (e) => {
      console.error(e)
      toast.error("Algo deu errado", {
        id: "update-currency",
      })
    },
  })

  const selectOption = useCallback(
    (value: string | null) => {
      if (!value) {
        toast.error("Por favor, selecione uma moeda")
        return
      }

      toast.loading("Atualizando moeda...", {
        id: "update-currency",
      })

      mutation.mutate(value)
    },
    [mutation]
  )

  return (
    <SkeletonWrapper isLoading={userSettings.isFetching}>
      <Combobox
        items={currencies}
        value={selectedOption}
        onValueChange={selectOption}
      >
        <ComboboxInput placeholder="Selecione a sua moeda" />
        <ComboboxContent>
          <ComboboxEmpty>Nenhuma moeda encontrada.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem
                disabled={mutation.isPending}
                key={item.value}
                value={item.value}
              >
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </SkeletonWrapper>
  )
}