//const sentence = 'Hello world';
function isPalindrom(word){
   const reversed = word.split('').reverse('').join('');
   const result = word === reversed;
   //console.log('result', result);
   return true;
}

module.exports = {isPalindrom};