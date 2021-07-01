import deserialze from '../src/deserialze'

test('deserialze', () => {
    const url = 'https://www.google.cn'
    expect(deserialze('key=0&arr[0]=1&arr[1]=2')).toEqual({ key: '0', arr: ['1', '2'] })
    expect(deserialze('?&key=0&arr[0]=1&arr[1]=2&?')).toEqual({ key: '0', arr: ['1', '2'] })
    expect(deserialze('?key=0&arr[0]=1&arr[1]=2&')).toEqual({ key: '0', arr: ['1', '2'] })
    expect(deserialze('&key=0&arr[0]=1&arr[1]=2?')).toEqual({ key: '0', arr: ['1', '2'] })
    expect(deserialze(url + '?key=0&arr[0]=1&arr[1]=2')).toEqual({ key: '0', arr: ['1', '2'] })
    expect(deserialze(url + '?&key=0&arr[0]=1&arr[1]=2')).toEqual({ key: '0', arr: ['1', '2'] })
})
