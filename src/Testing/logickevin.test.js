import {getSignedRequest} from '../Logic/logickevin'

const files = [{name:'pic.jpeg'},{name:'dev.png'}]

describe('Tests getSignedRequest',()=>{
    it('should have be a function',()=>{
        expect(typeof getSignedRequest).toBe('function')
    });
    
    it('should have an array for the parameter',()=>{
        expect(files).toBeInstanceOf(Array);
    });

    it('should have a random string that does not include spaces,etc',()=>{
        expect(files).not.toBe(Object)
    })
    
    it('should have a property of name',()=>{
        expect(files[0]).toHaveProperty('name')
    })
    
    it('should have a property of name',()=>{
        expect(typeof files[0].name).toBe('string')
    })

    it('should have a value with extension jpeg,png, or bmp',()=>{
        let result = files[0].name.search('.jpeg' || '.png' || '.bmp')
        expect(typeof result).toBe('number')
    })
    
    it('should have a value with extension jpeg,png, or bmp',()=>{
        let result = files[0].name.search('.jpeg' || '.png' || '.bmp')
        expect(result).not.toBe(-1)
    })

    it('should have a value with extension jpeg,png, or bmp',()=>{
        let result = files[0].name.search('.jpeg' || '.png' || '.bmp')
        expect(result).toBe(3)
    })    
})

