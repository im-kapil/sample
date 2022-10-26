import * as Name from 'w3name'
import { create, publish } from 'w3name'

const vqale = async () => {
    
    const name = await Name.create()
    
    console.log('Name:', name.toString())


    // e.g. k51qzi5uqu5di9agapykyjh3tqrf7i14a7fjq46oo0f6dxiimj62knq13059lt

  // The value to publish
  const value = '/ipfs/bafkreiem4twkqzsq2aj4shbycd4yvoj2cx72vezicletlhi7dijjciqpui'
  const revision = await Name.v0(name, value)

await Name.publish(revision, name.key)
}
vqale();