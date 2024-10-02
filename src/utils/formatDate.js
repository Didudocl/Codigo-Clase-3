export function formatToLocalTIme(date){
    return new Date(date).toLocaleString('es-CL',{timeZone:'America/Santiago'});
}