from pycolorname.pantone.pantonepaint import PantonePaint
import json

pantone_colors = PantonePaint()
for ob in jss:
    if ob['data'] in pantone_colors:
        ob['color'] = pantone_colors[ob['data']]

with open('acrostic_dumps.json', 'w') as file:
    file.write(json.dumps(jss))