import { getCollection, setComma, combineModelColor} from '../Logic/logicsam';

const num = 1238973243292789
const model = 'Airmax'
const colorway = 'Blue'

describe('Tests getCollection function', () => {
  it('should be a function', () => {
    expect(typeof getCollection).toBe('function')
  })

});


describe('Tests setComma function', () => {
  it('should be a function', () => {
    expect(typeof setComma).toBe('function')
  })

  it('should return string', () => {
    const result = setComma(num)
    expect( typeof result).toBe('string')
  })

});


describe('Tests combineModelColorfunction', () => {
  it('should be a function', () => {
    expect(typeof combineModelColor).toBe('function')
  })

  it('should return string', () => {
    const result = combineModelColor(model, colorway)
    expect( typeof result).toBe('string')
  })

  it('should return concatenate of model and colorway', () => {

    const result = combineModelColor(model, colorway)
      expect(result).toMatch('Airmax - Blue')
  })

});

