import os.path
from os import path
from PIL import Image

E_W, E_H = 50, 200

def sim(c, color):
    if color == 'pink':
        return (210 <= c[0] <= 255) and (120 <= c[1] <= 180) and (180 <= c[2] <= 255)
    myd = {
        'lime': (19, 234, 123),
        'shitp': (192, 98, 121),
        'darkg': (4, 31, 13)
    }
    if color in myd:
        myRGB = myd[color]
        for i in range(3):
            if abs(c[i] - myRGB[i]) > 4:
                return False
        return True

# def doq():
#     '''
#     Generates a qr code image from a binary qr code
#     @param imageName: name of the generated png image [0-759]
#     '''
#     # main = Image.new("RGB", (E_W*80, E_H))
#     good = list()
#     bw = [(0,0,0), (255,255,255)]
#     for imageNum in range(760):
#         imPath = 'words/sh-'+str(imageNum)+'.png'
#         if not path.exists(imPath) or path.exists('words/pink/sh-' + str(imageNum) + '.png'):
#             continue
#         with Image.open(imPath) as image: 
#         # with Image.open('shards/shard-'+str(imageNum)+'.png') as image: 
#             # s = [0, 0]
#             # for x in range(E_W):
#             #     for y in range(E_H):
#             #         if sim(image.getpixel((x, y)), 'pink'):
#             #             s[0] += 1
#             # if s[0] > 500:
#             #     image.save('words/notpink/sh-' + str(imageNum) + '.png')
#             image.save('words/notpink/sh-' + str(imageNum) + '.png')
    
#     # good.sort(key=lambda tup: tup[0] + tup[1])
#     # return good
#     # print(len(good))
#     # x = 0
#     # for imageNum, yy in good:
#     #     with Image.open('shards/shard-'+str(imageNum)+'.png') as image: 
#     #         main.paste(image, (x, 0))
#     #         x += E_W
#     # main.save('shards/temp/' + imageName + '.png')
#     # print(" Answer saved to: "+imageName + ".png")

def doq(imageName):
    '''
    Generates a qr code image from a binary qr code
    @param imageName: name of the generated png image [0-759]
    '''
    main = Image.new("RGB", (E_W*80, E_H))
    good = list()
    # myRGB = (22, 252, 11) # a green
    # myRGB = (34, 196, 241) # i forget
    for imageNum in range(760):
        with Image.open('shards/shard-'+str(imageNum)+'.png') as image: 
            total, count = 0, 0
            for x in range(E_W):
                for y in range(E_H):
                    if sim(image.getpixel((x, y)), 'shitp'):
                        total += y
                        count += 1
            if count < 3:
                continue
            avgy = total / count
            good.append((imageNum, avgy))

    good.sort(key=lambda tup: tup[1], reverse=False)
    print(len(good))
    x = 0
    for imageNum, yy in good:
        with Image.open('shards/shard-'+str(imageNum)+'.png') as image: 
            main.paste(image, (x, 0))
            x += E_W
    main.save('shards/temp/' + imageName + '.png')
    print(" Answer saved to: "+imageName + ".png")