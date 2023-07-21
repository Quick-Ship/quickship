export enum Error {
  SHIPMENT_NOT_FOUND = 'El envio no fue encontado.',
  SHIPMENT_STATUS_INVALID = 'Estatus del envio no valido para asignar mensajero.',
  COURIER_INVALID = 'El mesajero cuenta con un envio en proceso.',
  GUIDE_NOT_FOUND = 'El guia no fue encontada.',
  GUIDE_NOT_FOUND_SHIPMENT = 'La guia no se encuentra en el envio.',
  GUIDE_NOT_FOUND_ADD_SHIPMENT = 'Guias en estatus invalido: $guides',
  INVALID_PROCESS_PACKAGE = 'EL proceso del envio de no puede ser abierto. La guia no se encuenta en el estatus correcto.',
  INVALID_PACKAGE_STATUS = 'El estatus del envío es invalido para poder cerrar el proceso.',
}
