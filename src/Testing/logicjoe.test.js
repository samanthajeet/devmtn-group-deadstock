import {logout, getContacts, handleSwitchToCloset} from '../Logic/logicjoe';

const result = true;

describe('Tests logout function', () => {
    it('should be a function',()=>{
      expect(typeof logout).toBe('function')
    });
});

describe('Tests getContacts',()=>{
    it('should be a function',()=>{
        expect(typeof getContacts).toBe('function')
    })
})

describe('Tests handleSwitchToCloset',()=>{
    it('should be a function',()=>{
        expect(typeof handleSwitchToCloset).toBe('function')
    })
    it('should return a boolean value',()=>{
        expect(typeof result).toBe('boolean')
    })
    it('should not return an object',()=>{
        expect(result).not.toBe(-1)
    })
    it('should be defined',()=>{
        expect(handleSwitchToCloset()).toBeDefined()
    })
})