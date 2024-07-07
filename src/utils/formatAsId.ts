const formatAsId = (text:string) => {
  return text.replaceAll(/[ :[\]~<>+]+/g, '-').replaceAll(/[.|?!@#$%^&*()_=`'";]+/g, '').toLowerCase()
}

export default formatAsId