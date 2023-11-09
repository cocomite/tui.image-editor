import { commandNames } from '@/consts';

export function createAddTextCommand(command, graphics, args) {
  const a = [args[0], { ...args[1] }];
  delete a[1].autofocus;
  let angle = undefined;
  if (graphics && graphics._objects[a[1].id]) {
    angle = graphics._objects[a[1].id].angle;
  }
  if (angle) {
    a[1].styles = { ...a[1].styles, angle };
  }
  return { name: command.name, args: a };
}

export function changeTextStyle(commands, graphics, args) {
  commands.forEach((it) => {
    if (it.name !== commandNames.ADD_TEXT) {
      return;
    }
    const a = { ...it.args[1] };
    if (a.id !== args[0]) {
      return;
    }
    let angle = undefined;
    if (graphics && graphics._objects[args[0]]) {
      angle = graphics._objects[args[0]].angle;
    }
    if (angle) {
      a.styles = { ...a.styles, ...args[1], angle };
    } else {
      a.styles = { ...a.styles, ...args[1] };
    }
    it.args[1] = a;
  });
}

export function createAddObjectCommand(command, args) {
  switch (args[0].type) {
    case 'icon':
      return {
        name: commandNames.ADD_ICON,
        args: [
          args[0].iconType,
          {
            id: args[0].__fe_id,
            angle: args[0].angle,
            fill: args[0].fill,
            left: args[0].left,
            top: args[0].top,
            width: args[0].width,
            height: args[0].height,
            scaleX: args[0].scaleX,
            scaleY: args[0].scaleY,
          },
        ],
      };
    case 'rect':
      return {
        name: commandNames.ADD_SHAPE,
        args: [
          'rect',
          {
            id: args[0].__fe_id,
            angle: args[0].angle,
            fill: args[0].fill,
            left: args[0].left,
            top: args[0].top,
            originX: args[0].originX,
            originY: args[0].originY,
            width: args[0].width,
            height: args[0].height,
            stroke: args[0].stroke,
            strokeWidth: args[0].strokeWidth,
            startPoint: args[0].startPoint,
          },
        ],
      };
    case 'circle':
      return {
        name: commandNames.ADD_SHAPE,
        args: [
          'circle',
          {
            id: args[0].__fe_id,
            angle: args[0].angle,
            fill: args[0].fill,
            left: args[0].left,
            top: args[0].top,
            originX: args[0].originX,
            originY: args[0].originY,
            width: args[0].width,
            height: args[0].height,
            stroke: args[0].stroke,
            strokeWidth: args[0].strokeWidth,
            startPoint: args[0].startPoint,
            rx: args[0].rx,
            ry: args[0].ry,
          },
        ],
      };
    case 'triangle':
      return {
        name: commandNames.ADD_SHAPE,
        args: [
          'triangle',
          {
            id: args[0].__fe_id,
            angle: args[0].angle,
            fill: args[0].fill,
            left: args[0].left,
            top: args[0].top,
            originX: args[0].originX,
            originY: args[0].originY,
            width: args[0].width,
            height: args[0].height,
            stroke: args[0].stroke,
            strokeWidth: args[0].strokeWidth,
            startPoint: args[0].startPoint,
            rx: args[0].rx,
            ry: args[0].ry,
          },
        ],
      };
    case 'line':
      return {
        name: command.name,
        args: [
          {
            id: args[0].__fe_id,
            type: args[0].type,
            angle: args[0].angle,
            fill: args[0].fill,
            left: args[0].left,
            top: args[0].top,
            width: args[0].width,
            height: args[0].height,
            stroke: args[0].stroke,
            strokeWidth: args[0].strokeWidth,
            scaleX: args[0].scaleX,
            scaleY: args[0].scaleY,
            originX: args[0].originX,
            originY: args[0].originY,
            borderColor: args[0].borderColor,
            cornerColor: args[0].cornerColor,
            cornerSize: args[0].cornerSize,
            cornerStrokeColor: args[0].cornerStrokeColor,
            cornerStyle: args[0].cornerStyle,
            transparentCorners: args[0].transparentCorners,
            x1: args[0].x1,
            x2: args[0].x2,
            y1: args[0].y1,
            y2: args[0].y2,
          },
        ],
      };
    default:
      return null;
  }
}

export function createAddIconCommand(command, args) {
  return { name: command.name, args: [args[0], { ...args[1] }] };
}

export function changeIconColor(commands, args) {
  commands.forEach((it) => {
    switch (it.name) {
      case commandNames.ADD_OBJECT: {
        const a = { ...it.args[0] };
        if (a.id === args[0]) {
          a.fill = args[1];
        }
        it.args[0] = a;
        break;
      }
      case commandNames.ADD_ICON: {
        const a = { ...it.args[1] };
        if (a.id === args[0]) {
          a.fill = args[1];
        }
        it.args[1] = a;
        break;
      }
    }
  });
}

export function createAddShapeCommand(command, args) {
  return { name: command.name, args: [args[0], { ...args[1] }] };
}

export function changeShape(commands, args) {
  commands.forEach((it) => {
    switch (it.name) {
      case commandNames.ADD_OBJECT: {
        const a = { ...it.args[0] };
        if (a.id === args[0]) {
          Object.keys(args[1]).forEach((key) => {
            a[key] = args[1][key];
          });
        }
        it.args[0] = a;
        break;
      }
      case commandNames.ADD_SHAPE: {
        const a = { ...it.args[1] };
        if (a.id === args[0]) {
          Object.keys(args[1]).forEach((key) => {
            a[key] = args[1][key];
          });
        }
        it.args[1] = a;
        break;
      }
    }
  });
}

export function changeSelection(commands, graphics, args) {
  const [[arg]] = args;
  commands.forEach((it) => {
    switch (it.name) {
      case commandNames.ADD_TEXT: {
        const commandId = +it.args[1].id;
        const argId = +arg.id;
        if (commandId !== argId) {
          return;
        }
        const a = [it.args[0], { ...it.args[1] }];
        a[0] = arg.text;
        a[1] = {
          ...a[1],
          position: {
            x: arg.left,
            y: arg.top,
          },
          styles: {
            ...a[1].styles,
            angle:
              graphics && graphics._objects[arg.id] ? graphics._objects[arg.id].angle : undefined,
            fill: arg.fill,
            fontFamily: arg.fontFamily,
            fontSize: arg.fontSize,
            fontStyle: arg.fontStyle,
            fontWeight: arg.fontWeight,
            underline: arg.underline,
          },
        };
        it.args = a;
        return;
      }
      case commandNames.ADD_ICON:
      case commandNames.ADD_SHAPE: {
        const commandId = +it.args[1].id;
        const argId = +arg.id;
        if (commandId !== argId) {
          return;
        }
        it.args[1] = { ...it.args[1], ...arg, id: it.args[1].id };
        return;
      }
      case commandNames.ADD_OBJECT: {
        const commandId = +it.args[0].id;
        const argId = +arg.id;
        if (commandId !== argId) {
          return;
        }
        const a = { ...it.args[0] };
        Object.keys(a)
          .filter((key) => !['id', 'type'].includes(key))
          .forEach((key) => {
            a[key] = arg[key];
          });
        it.args[0] = a;
        return;
      }
    }
  });
}

export function removeObject(commands, args) {
  const id = +args[0];
  return commands.filter((it, index) => {
    switch (it.name) {
      case commandNames.ADD_TEXT: {
        return it.args[1].id !== id;
      }
      case commandNames.ADD_OBJECT: {
        return it.args[0].id !== id;
      }
      case commandNames.ADD_ICON: {
        return it.args[1].id !== id;
      }
      case commandNames.ADD_SHAPE: {
        return it.args[1].id !== id;
      }
      default:
        return true;
    }
  });
}

export function createCropCommand(args) {
  return { name: commandNames.CROP, args: { ...args } };
}
