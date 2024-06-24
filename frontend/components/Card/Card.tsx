import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
import { CircularProgress } from "@mui/material";

const WrapperCard = ({ data, address }: { data: any; address: any }) => {
  const constructUrl = (tag: string, appName: string) => {
    const baseUrl =
      "https://fleek-test.network/services/1/ipfs/bafkreigqlnmvdqnekygi5dgsqbv6ijky5fa3itpu6kdptrutj6xnyt4ipe";
    const url = `${baseUrl}?profile=${address}&app=${appName}&tag=${tag}`;
    return url;
  };

  const [loading, setLoading] = React.useState(false);

  const HandlelikeFunction = async () => {
    setLoading(true);
    setTimeout(async () => {
      if (data && data.tags) {
        for (let i = 0; i < data.tags.length; i++) {
          const url = constructUrl(data.tags[i], data.appName);
          console.log("inside", url);

          const response = await fetch(url);
          console.log(response);
          setLoading(false);
        }
      }
    }, 5000);
  };

  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src={data.imgSrc}
            srcSet={data.imgSrcSet}
            loading="lazy"
            alt={data.alt}
          />
        </AspectRatio>
        <div onClick={HandlelikeFunction}>
          <IconButton
            aria-label={`Like ${data.title}`}
            size="md"
            variant="solid"
            color="danger"
            sx={{
              position: "absolute",
              zIndex: 2,
              borderRadius: "50%",
              right: "1rem",
              bottom: 0,
              transform: "translateY(50%)",
            }}
          >
            {loading ? (
              <CircularProgress sx={{ color: "white" }} size={15} />
            ) : (
              <Favorite />
            )}
          </IconButton>{" "}
        </div>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">
          <Link overlay underline="none">
            {data.title}
          </Link>
        </Typography>
        <Typography level="body-sm">
          <Link>{data.location}</Link>
        </Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography level="body-xs">{data.views}</Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">{data.time}</Typography>
        </CardContent>
        <CardContent
          sx={{ display: "flex", justifyContent: "space-between" }}
        ></CardContent>
      </CardOverflow>
    </Card>
  );
};

export default WrapperCard;
