const time = "12:07";
const [hour, minutes] = time.split(":");

const result = Number((hour * 60) + Number(minutes));

console.log(result)