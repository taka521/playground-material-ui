import * as React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  makeStyles,
  createStyles,
  ListItem,
  List,
} from "@material-ui/core";
import { useAspectRatio } from "use-aspect-ratio";

type AspectRaito = "wide" | "normal" | "square";

type StyleProps = {
  width: number | string;
  aspect?: AspectRaito;
};
const useStyles = makeStyles(() =>
  createStyles({
    root: (props: StyleProps) => ({
      width: "100%",
      maxWidth: props.width,
    }),
  })
);

type Props = {
  width?: string | number;
  aspect?: AspectRaito;
  image: string;
};

const raito: { [key in AspectRaito]: number } = {
  wide: 16 / 9,
  normal: 4 / 3,
  square: 1,
};
const ImageComponent: React.FC<Props> = ({ width = "100%", aspect, image }) => {
  const classes = useStyles({ width, aspect });
  const ref = useAspectRatio(aspect ? raito[aspect] : 1);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          ref={aspect ? ref : undefined}
          image={image}
          component="img"
        />
      </CardActionArea>
    </Card>
  );
};

const listItems: {
  id: string;
  width?: string | number;
  aspect?: AspectRaito;
  image: string;
}[] = [
  {
    id: "10",
    width: "100%",
    aspect: undefined,
    image:
      "https://images.unsplash.com/photo-1593950752465-e62449055e13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "11",
    width: "100%",
    aspect: "wide",
    image:
      "https://images.unsplash.com/photo-1593786902073-86b681695a79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "12",
    width: "100%",
    aspect: "normal",
    image:
      "https://images.unsplash.com/photo-1593643946890-b5b85ade6451?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "13",
    width: "100%",
    aspect: "square",
    image:
      "https://images.unsplash.com/photo-1593808864112-62ed6b7227e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "14",
    width: "30%",
    aspect: undefined,
    image:
      "https://images.unsplash.com/photo-1594026227336-c02a1c8fe4b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "15",
    width: "30%",
    aspect: "wide",
    image:
      "https://images.unsplash.com/photo-1594008037842-11fe03ea82af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "16",
    width: "30%",
    aspect: "normal",
    image:
      "https://images.unsplash.com/photo-1593520805730-6c91e0e73056?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "17",
    width: "30%",
    aspect: "square",
    image:
      "https://images.unsplash.com/photo-1593806981143-6945fb11c6b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "20",
    width: 200,
    aspect: undefined,
    image:
      "https://images.unsplash.com/photo-1593870103832-d9359e509a00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "21",
    width: 200,
    aspect: "wide",
    image:
      "https://images.unsplash.com/photo-1593717761902-ac814190dc8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "22",
    width: 200,
    aspect: "normal",
    image:
      "https://images.unsplash.com/photo-1593642703055-4b72c180d9b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "23",
    width: 200,
    aspect: "square",
    image:
      "https://images.unsplash.com/photo-1593854989775-ae5e4d9e49e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
];
export const AspectRaito = () => {
  return (
    <List style={{ width: 500 }}>
      {listItems.map((item) => (
        <ListItem key={item.id} divider>
          <ImageComponent
            width={item.width}
            aspect={item.aspect}
            image={item.image}
          />
          <p>{`width: ${item.width}, aspect: ${item.aspect}`}</p>
        </ListItem>
      ))}
    </List>
  );
};
