const fs = require('fs')
const file= fs.createWriteStream('./big')

for (let i=0; i <= 1e6; i++){
file.write('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam orci lectus, imperdiet non nunc a, sollicitudin hendrerit magna. Nam nisl ipsum, finibus quis purus sit amet, consectetur dignissim massa. Nunc vestibulum tristique mi. Nam id dapibus dolor. Aenean rhoncus magna at urna mollis, nec mattis tortor blandit. Phasellus dictum dui id orci efficitur varius. Curabitur id quam orci. Nunc tempus eros nec consectetur finibus. Cras ac nulla non turpis aliquet elementum. Vivamus et cursus nulla, in pharetra mauris. Nunc eu quam sit amet dui eleifend varius.')
}

file.end()