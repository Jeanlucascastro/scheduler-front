export function formatarDataEHora(dataString: string | number | Date | null) {
  if (!dataString) {
    return ''
  }

  const data = new Date(dataString)

  const dia = data.getDate()
  const mes = data.getMonth() + 1
  const ano = data.getFullYear()
  const hora = data.getHours()
  const minutos = data.getMinutes()

  const dataFormatada =
    dia.toString().padStart(2, '0') +
    '/' +
    mes.toString().padStart(2, '0') +
    '/' +
    ano +
    ' ' +
    hora.toString().padStart(2, '0') +
    ':' +
    minutos.toString().padStart(2, '0')

  return dataFormatada
}

export function formatarHora(dataString: string | number | Date | null) {
  if (!dataString) {
    return ''
  }

  const data = new Date(dataString)

  const hora = data.getHours()
  const minutos = data.getMinutes()

  const horaFormatada =
    hora.toString().padStart(2, '0') +
    ':' +
    minutos.toString().padStart(2, '0')

  return horaFormatada
}