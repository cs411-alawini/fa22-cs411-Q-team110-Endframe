FROM golang:1.18-alpine
WORKDIR /app
COPY ./api/go.mod .
COPY ./api/go.sum .
RUN go mod download
COPY ./api/ .
RUN go build -o ./out/server .

CMD ["/app/out/server"]